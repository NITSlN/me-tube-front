import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { LoginContext } from "../context/LoginContext";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color:${props => props.bgcolor};
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;


const Video = () => {
  const { video, setVideo, currentUser, cliked, setCliked } =
    useContext(LoginContext);
  const [channel, setChannel] = useState({});
  const videoId = useLocation().pathname.split("/")[2];
  
  

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(`/videos/find/${videoId}`);
        
        const channelRes = await axios.get(`/users/find/${res.data.userId}`);
        setVideo(res.data);
        setChannel(channelRes.data);
      } catch (error) {}
    };
    getVideo();
  }, [videoId, cliked]);

  useEffect(()=>{
    const incView = async () => {
      try {
        await axios.put(`/videos/view/${videoId}`);
      } catch (error) {}
    };
    if(channel) incView()
  },[])

  const handleLike = async () => {
    try {
      if(currentUser){
        await axios.put(`/users/like/${video._id}`);
        setCliked(!cliked);
      }else{
        alert("You need to Login first")
      }

    } catch (e) {}
  };
  const handleDislike = async () => {
    try {
      if(currentUser){
        await axios.put(`/users/dislike/${video._id}`);
        setCliked(!cliked);
      }else{
        alert("You need to Login first")
      }
    } catch (e) {}
  };
  const handleSub = async ()=>{
    try {
      if(currentUser){
        currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(`/users/unsub/${channel._id}`)
        : await axios.put(`/users/sub/${channel._id}`);
        setCliked(!cliked)
      }else{
        alert("You need to Login first")
      }
    } catch (er) {
      
    }

  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
        <VideoFrame src={video.videoUrl} controls />
        </VideoWrapper>
        <Title>{video.title}</Title>
        <Details>
          <Info>
            {video.views} views ??? {format(video.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {video.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {video.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {video.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://profilepicture7.com/img/img_nanshengdongman/4/-1873247687.jpg" />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{video.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub} bgcolor={currentUser?.subscribedUsers.includes(channel._id)?"gray":"red"}>
            {currentUser?.subscribedUsers.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={video._id}/>
      </Content>
      <Recommendation tags={video.tags}/>
    </Container>
  );
};

export default Video;
