import { Consent } from "@empirica/core/player/react";

export function MyConsent({ onConsent }) {
  return (
    <Consent
      title="Informed Consent Notice"
      text="Please consider the following information before agreeing to participate: • In this experiment you will read a few short stories and answer brief questions about them. The entire study should take approximately 5 minutes to complete • You must be at least 18 years of age to participate in this study. • There are no risks or personal benefits of any kind involved in this study (other than your remuneration). • You will be paid for your participation at the posted rate (provided that you complete the whole study). • Your participation in this study will remain confidential. The researchers will not record or analyse any data allowing for your identification. • This is an academic study and the researchers are not going to use obtained results for any commercial purposes. • Participation in this study is voluntary. At any point, you may refuse to participate further without providing any explanation. • The study is part of a research project conducted at the Interdisciplinary Centre for Ethics at the Jagiellonian University. Should you have any questions or wish to learn more about this study and its results, please reach out to Piotr Bystranowski at piotr.bystranowski@uj.edu.pl • By clicking the button below and proceeding to the study task, you indicate that you have read this form and consented to participate in accordance with the above conditions."
      buttonText="I do give my informed consent to participate in this study."
      onConsent={onConsent}
    />
  );
}