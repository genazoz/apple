import {NextPage} from "next";
import styled from "styled-components";
import useWindowDimensions from "../@hooks/useWindowDimensions";
import IPadLandscape from "../components/devices/IPadLandscape";
import IPadPortrait from "../components/devices/IPadPortrait/index";
import IPhonePortrait from "../components/devices/IPhonePortrait/index";
import IPhoneLandscape from "../components/devices/IPhoneLandscape/index";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  margin: auto;
  padding: 50px 10%;
  
  background: #AAAAAA;
`;

const Home: NextPage = () => {
  const width = useWindowDimensions().width;

  return <Container>
    {
      (() => {
        if(!width) {
          return;
        } else if (width > 1024) {
          return <IPadLandscape/>
        } else if (width > 768) {
          return <IPadPortrait/>
        } else if (width > 568) {
          return <IPhoneLandscape/>
        } else {
          return <IPhonePortrait/>
        }
      })()
    }
  </Container>;
}

export default Home;
