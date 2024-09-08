import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, doc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


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
const blogSection = document.querySelector('.blogs-section');



    const blogsCollection = collection(db, "blogs");

    getDocs(blogsCollection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id != location.pathname.split("/").pop()) {
                createBlog(doc);
                console.log(doc);
            }
        });
    }).catch((error) => {
        console.error("Error fetching blogs: ", error);
    });

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card"> 
             <img src="${data.bannerImage}" class="blog-image" alt=""> 
             <h1 class="blog-title">${data.title.substring(0,100) + '...'}</h1> 
             <p class="blog-overview">${data.article.substring(0,200) + '...'}</p>
             <a href="/${blog.id}" class="btn-dark">read</a> 
        </div>
    `;
}