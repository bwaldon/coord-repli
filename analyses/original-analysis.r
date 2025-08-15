setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

library(tidyverse)
library(car)
library(emmeans)
library(interactions)
library(lme4)

cgdata <- read_csv("../data/demo/playerRound.csv")

cgdata <- cgdata %>%
  mutate(resp = case_when(resp == "Yes" ~ 1,
                         resp == "No" ~ 0,
                         TRUE ~ NA)) %>%
  filter(case_type %in% c("overinclusion","underinclusion"))

cgModel = glmer(resp ~ case_type*condition + (1 | playerID) + (1 | scenario), cgdata, family = 'binomial')
car::Anova(cgModel, type = 2)
emmeans(cgModel, pairwise ~  condition | case_type, type = 'response')

Fig3Bdata = as.data.frame(emmeans(cgModel, ~  condition | case_type, type = 'response')) %>%
  rename(Transgression = prob, LowCI = asymp.LCL, HighCI = asymp.UCL) %>%
  select(condition, case_type, Transgression, LowCI, HighCI)

levels(Fig3Bdata$condition) = c('Coordination', 'Control')
levels(Fig3Bdata$case_type) = c('Overinclusion', 'Underinclusion')

Fig3B = ggplot(Fig3Bdata, aes(x = reorder(case_type, desc(case_type)), y = Transgression, 
                              group = condition, 
                              color = condition, shape = case_type))+
  geom_hline(yintercept = 0.5, linetype = 3, color = 'black')+
  geom_line(linetype = 2, size = .7,
            position = position_dodge(width = .8))+
  geom_linerange(aes(ymin = LowCI, ymax = HighCI), size = 0.8, alpha = 0.8,
                 position = position_dodge(width = .8))+
  geom_point(size = 3, stroke = 1,
             position = position_dodge(width = .8), fill = 'white')+
  theme_classic()+
  ylab('')+xlab(NULL)+
  theme(text = element_text(size = 11),
        legend.position = c(.5, .85),
        legend.title=element_blank(),
        legend.background = element_rect(fill = "#F5F5F5", 
                                         color = NA),  
        axis.text.x = element_text(size = 7),
        axis.text.y = element_blank(),
        legend.text = element_text(size = 7),
        axis.ticks = element_blank(),
        plot.margin = margin(18, 1, 1, 1, 'pt'))+
  scale_shape_manual(values = c(24, 21), guide = 'none')+
  xlab(NULL)+scale_y_continuous(breaks = c(0, 0.5, 1), limits = c(0,1))+
  scale_color_manual(values = c('#1B9E77', '#7570B3'))+
  scale_fill_manual(values = c('#1B9E77', '#7570B3'))

