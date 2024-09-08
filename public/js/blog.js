import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, doc , getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Your web app's Firebase configuration
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0hP2UzeTZj36jKarLoxR1yGfqEqJUT3A",
    authDomain: "blogging-website-82941.firebaseapp.com",
    projectId: "blogging-website-82941",
    storageBucket: "blogging-website-82941.appspot.com",
    messagingSenderId: "827076777385",
    appId: "1:827076777385:web:c2cf65f35ffdfd1cace0b8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


const blogId = decodeURI(location.pathname.split("/").pop());

 let docRef = doc(db, "blogs", blogId);

 getDoc(docRef).then((doc) => {
    if (doc.exists()) {
        setupBlog(doc.data());
    } else {
        location.replace("/");
    }
});


const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    if (banner) {
        banner.style.backgroundImage = `url(${data.bannerImage})`;
    } 

    if (blogTitle && titleTag) {
        titleTag.innerHTML += blogTitle.innerHTML = data.title;
    } 

    if (publish) {
        publish.innerHTML += data.publishedAt;
    } 

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        //check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] =="["){
            let seperator;

            for(let i =0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length-1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `<img src="${src}" alt="${alt}" class="article-image">`;
        }
        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}