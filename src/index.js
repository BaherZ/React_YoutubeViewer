import _ from 'lodash'
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from'youtube-api-search';
import SearchBar from './components/searchBar.js';
import VideoList from './components/videoList.js';
import VideoDetail from './components/videoDetail.js'
const API_KEY = "AIzaSyC6XkIhIsgumfuqqyaUYTVtw67YA4svRcU";

//Create a new component
class App extends Component{
    constructor(props){
        super(props);
        
        this.state={ videos:[],
                     selectedVideo:null
                   };
        this.videoSearch('surfboards')
    }
    videoSearch(term){
        YTSearch({key:API_KEY,term:term},(videos)=>{
            this.setState({
                videos:videos,
                selectedVideo:videos[0]
            });//this.setState({videos:videos})
        });
    }
    render(){
        const videoSearch = _.debounce((term)=>{this.videoSearch(term) },300);
        return (
        <div>
            <SearchBar onSearchTermChange = {videoSearch}/>   
            <VideoDetail video = {this.state.selectedVideo}/>
            <VideoList videos = {this.state.videos} onVideoSelect = {selectedVideo=>this.setState({selectedVideo})} />  
        </div>
    );}
	
} 

//Render component
ReactDOM.render(<App />,document.querySelector('.container'))

