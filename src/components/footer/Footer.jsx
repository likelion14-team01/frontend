import styled from "styled-components";
import { useLocation } from "react-router-dom";

import homeIcon from "../../assets/icons/home.svg";
import homeActive from "../../assets/icons/home_active.svg";
import mypageIcon from "../../assets/icons/mypage.svg";
import timelineIcon from "../../assets/icons/timeline.svg";
import timelineActive from "../../assets/icons/timeline_active.svg";

const FooterContainer = styled.div`
    width: 402px;
    height: 79px;
    position: relative;
    background: white;  
    box-shadow: 0px -3px 16.100000381469727px #F2F5F1;
    overflow: hidden;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: absolute;
    left: 0;
    bottom: 0;
`;

const HomeIcon = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 17px;
    left: 59px;
`;

const TimelineIcon = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 17px;
    left: 186px;
`;

const MypageIcon = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 17px;
    left: 313px;
`;

const HomeP = styled.p`
    text-align: center;
    position: absolute;
    top: 35px;
    left: 68px;
`;

const TimelineP = styled.p`
    text-align: center;
    position: absolute;
    top: 35px;
    left: 180px;
`;

const MypageP = styled.p`
    text-align: center;
    position: absolute;
    top: 35px;
    left: 313px;
`;

const MenuSpan = styled.span`
    color: #3F3F3F;
    font-size: 12px;
    font-family: Pretendard Variable;
    font-weight: 600;
`;

export default function Footer() {

    const { pathname } = useLocation();

    return (
        <FooterContainer>
            <HomeIcon src={pathname === "/" || pathname.startsWith("/record/") || pathname === "/register" ? homeActive : homeIcon}/>
            <TimelineIcon src={pathname === "/timeline" ? timelineActive : timelineIcon} />
            <MypageIcon src={pathname === "/mypage" ? mypageActive : mypageIcon} />
            <HomeP><MenuSpan>홈</MenuSpan></HomeP>
            <TimelineP><MenuSpan>타임라인</MenuSpan></TimelineP>
            <MypageP><MenuSpan>준비중</MenuSpan></MypageP>
        </FooterContainer>
    );
}