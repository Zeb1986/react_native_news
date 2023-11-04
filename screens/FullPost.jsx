import React from "react";
import styled from "styled-components/native";
import {View} from "react-native";
import axios from "axios";
import {Loading} from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`
const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`
export const FullPostScreen = ({route, navigation}) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [post, setPost] = React.useState({})
    const {id, title} = route.params

    const fetchPost = () => {
        setIsLoading(true)
        axios.get('https://65452e655a0b4b04436dc7c9.mockapi.io/api/posts/' + id)
            .then(({data}) => setPost(data))
            .catch((err) => {
                console.log(err)
            }).finally(() => setIsLoading(false))
    }

    React.useEffect(() => {
        navigation.setOptions({
            title,
        })
        fetchPost()
    }, [])

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <View style={{padding:20}}>
            <PostImage source={{uri:post.imageUrl}}/>
            <PostText>{post.text}</PostText>
        </View>
    )
}