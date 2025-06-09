import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  animation: slideUp 0.6s ease-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProgressDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  transition: all 0.3s;
  background: ${props => props.active ? 'var(--teal-400)' : 'rgba(255, 255, 255, 0.3)'};
  transform: ${props => props.active ? 'scale(1.25)' : 'scale(1)'};
`;

const FormContainer = styled.div`
  overflow: hidden;
`;

const FormSteps = styled.div`
  display: flex;
  transition: transform 0.5s ease-out;
  transform: translateX(${props => `-${props.currentStep * 100}%`});
`;

const FormStep = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding: 0 1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: var(--teal-400);
    box-shadow: 0 0 0 2px rgba(78, 205, 196, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  background: linear-gradient(to right, rgba(79,70,229,0.7), rgba(124,58,237,0.7));
  color: #fff;
  border: 1.5px solid rgba(255,255,255,0.25);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 24px rgba(79, 70, 229, 0.10);
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(79, 70, 229, 0.18);
  }
`;

const PreviousButton = styled(Button)`
  background: rgba(224,231,255,0.7);
  color: #4f46e5;
  margin-right: 0.5rem;
  &:hover {
    background: rgba(199,210,254,0.85);
    color: #3730a3;
  }
`;

const DailyCheckIn = ({
  currentStep,
  totalSteps,
  formData,
  formSteps,
  handleInputChange,
  changeStep,
  calculateWellnessScore
}) => {
  return (
    <Card>
      <Title>Daily Check-In</Title>
      <ProgressIndicator>
        {[...Array(totalSteps)].map((_, i) => (
          <ProgressDot key={i} active={i <= currentStep} />
        ))}
      </ProgressIndicator>
      <FormContainer>
        <FormSteps currentStep={currentStep}>
          {formSteps.map((step, stepIndex) => (
            <FormStep key={stepIndex}>
              {step.fields.map((field) => (
                <InputGroup key={field.key}>
                  <Label>{field.label}</Label>
                  <Input
                    type="number"
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                  />
                </InputGroup>
              ))}
            </FormStep>
          ))}
        </FormSteps>
      </FormContainer>
      <ButtonGroup>
        <PreviousButton
          onClick={() => changeStep(-1)}
          disabled={currentStep === 0}
        >
          Previous
        </PreviousButton>
        <Button
          onClick={currentStep === totalSteps - 1 ? calculateWellnessScore : () => changeStep(1)}
        >
          {currentStep === totalSteps - 1 ? 'Calculate Score' : 'Next'}
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default DailyCheckIn;