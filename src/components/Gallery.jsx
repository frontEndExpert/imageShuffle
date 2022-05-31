import React,{useState, useEffect} from 'react';




const Gallery = () => {
    const [picList, setPicList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [picsPages, setPicsPages] = useState(null);
    const [indexList, setIndexList] = useState([]);
    const [desVisibility,setDesVisibility] = useState('hidden')
    //var desVisibility = 'hidden';

    const apiUrl = 'http://j0.wlmediahub.com/App_themes/api/test/new/phtos.js'
    useEffect(() => {
           fetch(apiUrl)
                        .then((response) => {
                        return response.json()
                        })
                        .then((data) => {
                            setPicList(data.photo)
                        })
                        .catch((err) => {
                            console.log("Error fetching", err)
                        })          
            if(picList.length > 5){
                    peakPhoto()
                }
      }, [])



    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const peakPhoto = () => {
        var newPicsPages=[]
        let newPicIndex = 0
        if(picList.length> 5){
            for (let i = 0; i < 5; ){
                let loadNewPhotos = true;
                while (loadNewPhotos){
                    newPicIndex =  getRandomNumber(0, picList.length)
                    if(picList[newPicIndex].title.length > 0 && 
                            picList[newPicIndex].description.length >0 && 
                                !indexList.includes(newPicIndex)) {
                                        if(indexList.length < 15){ 
                                                let temp = [...indexList]
                                                temp.push(newPicIndex)
                                                setIndexList(temp)
                                        } else {
                                            let temp = [...indexList]
                                            temp.reverse().pop()
                                            console.log("indexList1 temp",temp)
                                            temp.push(newPicIndex)
                                            setIndexList(temp)
                                            console.log("indexList2",indexList)
                                        }
                                        console.log("indexList0 indexList",indexList)
                                        newPicsPages.push(picList[newPicIndex])
                                        i++
                                        loadNewPhotos = false
                    } else{ 
                        loadNewPhotos = true;
                    }
                }
            }
        }
        setPicsPages(newPicsPages)
        setCurrentIndex(0)
    }



    const shuffle = () => {
        peakPhoto()
    }

    const handleClick = (num) => {
        setCurrentIndex( num)
    }
    

      useEffect(() => { 
          if( !picList || picList.length === 0){
            fetch(apiUrl)
            .then((response) => {
            return response.json()
            })
            .then((data) => {
               // console.log("if picList Empty data",data);
                setPicList(data.photo)
            })
            .catch((err) => {
                console.log("Error fetching", err)
            })
            if(!picsPages){
                peakPhoto();
            }
            
          }
        }, [picList, picsPages])


    return <>

      {picsPages && picsPages.length > 0 && 
        <div className="picture"  key={picsPages[currentIndex].id}>
            <div className="imgContainer"  >
                    <img onMouseOver={()=> { setDesVisibility('visible');}} onMouseOut={()=>setDesVisibility('hidden')} className="img" src={picsPages[currentIndex].img} 
                                 alt={picsPages[currentIndex].title} />
            </div>
            <div className="header" >{picsPages[currentIndex].title}</div>
            <div className="description" >{picsPages[currentIndex].description}</div>
        </div>}
        <div className="pagination"  >
            <span onClick={(num)=>handleClick("0")} value="1">1 </span>
            <span onClick={(num)=>handleClick("1")} value="2">&nbsp; 2 </span>
            <span onClick={(num)=>handleClick("2")} value="3">&nbsp; 3 </span>
            <span onClick={(num)=>handleClick("3")} value="4">&nbsp; 4 </span>
            <span onClick={(num)=>handleClick("4")} value="5">&nbsp; 5 </span>
        </div>
        <div className="shuffle" onClick={shuffle} >Shuffle</div>
        <style jsx>{` 
            .picture {
                position: relative;
                width: 100%;
                height: fit-content;
                display: flex;
                height: 500px;

            }
            .img {
                width: auto;
                height: 500px;
                margin: auto 0px;
            }
            .imgContainer > .img:hover {
                cursor: pointer;
            }
            .header {
                position: absolute;
                top: 0px;
                left: 0px;
                z-index: 10;
                font-size: 12px;
                background-color: white;
                opacity: 60%;
                color: black;
                visibility: ${desVisibility};
            }
            .imgContainer{
                display: inline-block;
                text-align: center;
                width: 100%;
                height: 500px;
            }
            .description {
                position: absolute;
                bottom: 0px;
                width: 100%;
                z-index: 10;
                font-size: 12px;
                color: black;
                background-color: white;
                opacity: 60%;
                visibility: ${desVisibility};
            }
            .pagination {
                display: flex;
                flex-flow: row nowrap;
                width: 200px;
                justify-content: center;
                color: white;
                font-size: 14px;
                position: absolute;
                left:40%;
            }
            .pagination > span:hover{
                cursor: pointer;
                fort-weight: bold;
            }
            .shuffle {
                position: absolute;
                right: 0px;
                margin: 0 10px;
                cursor: pointer;
            }


        `}
        </style>
    </>

}

export default Gallery