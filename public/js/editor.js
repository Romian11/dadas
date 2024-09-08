// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

// Store the current user's email
let userEmail = '';

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        userEmail = user.email;
    } else {
        console.log('User not logged in');
        // Handle the case where the user is not logged in
        // You might want to redirect them to a login page or show a message
    }
});

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

// Banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
});

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
});

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                if (uploadType == "image") {
                    addImage(data, file.name);
                } else {
                    bannerPath = `${location.origin}/${data}`;
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            });
    } else {
        alert("Upload image only");
    }
};

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {
        // Generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // Setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date();

        setDoc(doc(collection(db, "blogs"), docName), {
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
            author: userEmail.split("@")[0]
        })
            .then(() => {
                console.log('Data entered');
                location.href = `/${docName}`;
            })
            .catch((err) => {
                console.error(err);
            });
    }
});
