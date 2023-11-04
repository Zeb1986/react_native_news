import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React from "react";
import {Post} from "../components/Post";
import axios from "axios";
import {Loading} from "../components/Loading";

export default function HomeScreen({navigation}) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [posts, setPosts] = React.useState([])

    const fetchPosts = () => {
        setIsLoading(true)
        axios.get('https://65452e655a0b4b04436dc7c9.mockapi.io/api/posts')
            .then(({data}) => setPosts(data))
            .catch((err) => {
                console.log(err)
            }).finally(() => setIsLoading(false))
    }

    React.useEffect(fetchPosts, [])

    if (isLoading) {
        return (
            <Loading/>
        )
    }
    return (
        <View>
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts}/>}
                data={posts}
                renderItem={(({item}) =>
                        <TouchableOpacity onPress={() => {navigation.navigate('FullPost', {id: item.id, title: item.title})}}>
                            <Post
                                title={item.title}
                                createdAt={item.createdAt}
                                imageUrl={item.imageUrl}
                            />
                        </TouchableOpacity>
                )}/>
        </View>
    );
}

