setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

library(tidyverse)
library(car)
library(emmeans)
library(interactions)
library(lme4)

prolificInfo_coodination <- read_csv("../data/pipeline/prolific_export_duo.csv") %>%
  mutate(condition = "coordination")
prolificInfo_control <- read_csv("../data/pipeline/prolific_export_solo.csv") %>%
  mutate(condition = "control")

prolificInfo <- rbind(prolificInfo_coodination, prolificInfo_control) %>%
  filter(`Completion code` %in% c("DMM9REA8", "CMM9REA9", "CRGEGQIS"))
rm(prolificInfo_coodination, prolificInfo_control)

workers_to_analyze <- prolificInfo$`Participant id`

## Median completion times 

coordination_med_completion_time = median((prolificInfo %>% filter(condition == "coordination"))$`Time taken`) / 60
control_med_completion_time = median((prolificInfo %>% filter(condition == "control"))$`Time taken`) / 60

players_to_analyze <- (read_csv("../data/pipeline/player.csv") %>%
  filter(participantIdentifier %in% workers_to_analyze))$id
  
cgdata <- read_csv("../data/pipeline/playerRound.csv") %>%
  filter(playerID %in% players_to_analyze)

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
  theme_classic()+xlab(NULL)+
  theme(text = element_text(size = 11),
        legend.position = c(.25, .85),
        legend.title=element_blank(),
        legend.background = element_rect(fill = "#F5F5F5", 
                                         color = NA),  
        axis.text.x = element_text(size = 7),
        # axis.text.y = element_blank(),
        legend.text = element_text(size = 7),
        # axis.ticks = element_blank(),
        plot.margin = margin(18, 1, 1, 1, 'pt'))+
  scale_shape_manual(values = c(24, 21), guide = 'none')+
  xlab(NULL)+scale_y_continuous(breaks = c(0, 0.5, 1), limits = c(0,1))+
  scale_color_manual(values = c('#7570B3', '#1B9E77'))+
  scale_fill_manual(values = c('#7570B3', '#1B9E77'))+
  ylab("Transgression judgment")

Fig3B


