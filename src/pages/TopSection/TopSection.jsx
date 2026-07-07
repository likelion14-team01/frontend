import styled from "styled-components";
import plantIcon from "../../assets/images/home_plant.svg";

const TopSectionContainer = styled.div`
    width: 402px;
    height: 336px;
    position: relative;
`;

const DayP = styled.p`
    left: 154px;
    top: 13px;
    position: absolute;
    text-align: center;
`;

const DaySpan = styled.span`
    color: #3F3F3F;
    font-size: 15px;
    font-family: Pretendard Variable;
    font-weight: 600;
`;

const PlantImg = styled.img`
    width: 176px;
    height: 189px;
    position: absolute;
    top: 62px;
    left: 109px;
`;

const Bubble = styled.div`
    width: 320px;
    height: 48px;
    border-radius: 20px;
    background: white;
    position: absolute;
    top: 272px;
    left: 41px;
`;

const Bubbletail = styled.div`
    width: 31px;
    height: 31px;
    background: white;
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
`;

const IntroduceP = styled.p`
    position: absolute;
    left: 70px;
`;

const IntroduceSpan = styled.span`
    color: #3F3F3F;
    font-size: 14px;
    font-family: Pretendard Variable;
    font-weight: 500;
`;

export default function TopSection() {
    return (
        <TopSectionContainer>
            <DayP><DaySpan>07월 07일 (화)</DaySpan></DayP>
            <PlantImg src={plantIcon} />
            <Bubble><Bubbletail /><IntroduceP><IntroduceSpan>오늘의 식물 이야기를 남겨보세요!</IntroduceSpan></IntroduceP></Bubble>
        </TopSectionContainer>
    );
}