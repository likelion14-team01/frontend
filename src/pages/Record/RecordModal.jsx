import styled from "styled-components";

import checkIcon from "../../assets/icons/check_icon.svg";

const farewellIcon = "🪦";

const ModalOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const ModalContainer = styled.div`
    width: 280px;
    height: 333px;
    background: #ffffff;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 38px 16px 16px;
`;


const CheckImage = styled.img`
    width: 96px;
    height: 96px;
`;

const FarewellIcon = styled.div`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: 4px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d8d8d8;
    font-size: 44px;
    line-height: 1;
`;

const Title = styled.h2`
    color: #3F3F3F;
    font-size: 20px;
    font-family: Pretendard Variable;
    font-weight: 600;
`;

const Description = styled.p`
    margin: 0;
    color: #A8A8A8;
    font-size: 14px;
    font-family: Pretendard Variable;
    font-weight: 500;
`;

const HomeButton = styled.button`
    width: 256px;
    height: 68px;
    margin-top: 32px;
    border: none;
    border-radius: 61px;
    background: ${({ $variant }) => ($variant === "farewell" ? "#a8a8a8" : "#78dc6e")};
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
`;

export default function RecordModal({ title, description, buttonText, onButtonClick, variant = "complete" }) {
    return (
        <ModalOverlay>
            <ModalContainer>
                {variant === "farewell" ? (
                    <FarewellIcon>{farewellIcon}</FarewellIcon>
                ) : (
                    <CheckImage src={checkIcon} alt="기록 완료" />
                )}
                <Title>{title}</Title>
                <Description>{description}</Description>
                <HomeButton $variant={variant} onClick={onButtonClick}>
                    {buttonText}
                </HomeButton>
            </ModalContainer>
        </ModalOverlay>
    );
}