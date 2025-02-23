import { onSnapshot,collection,db,saveUser } from "./firebase.js";
const salt = generarSalt();
let userPassword = "Ramis20.";
let encryptedPassword = encryptPassword(userPassword,salt);
 
//generar salt 
export function generarSalt() {
    return [...crypto.getRandomValues(new Uint8Array(16))]
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

//encriptar contrasenya

export function encryptPassword(userPassword,salt) {
   
   
    const hashedPassword = CryptoJS.SHA256(userPassword + salt).toString();
    return hashedPassword;
}

//desencriptar contrasenya
function desencryptPassword(encryptedPassword,salt) {
    
    const decryptedMessage = CryptoJS.AES.decrypt(encryptedPassword, salt).toString(CryptoJS.enc.Utf8);

    return decryptedMessage;
}





//  let json_users =  [{
//     id : 1, 
//     name: "admin" , 
//     email: "desenvolupador@iesjoanramis.org", 
//     password: encryptedPassword, 
//     salt: salt , 
//     edit_users: 1, 
//     edit_news: 1, 
//     edit_bones_files: 1, 
//     active: 1,
//     is_first_login: 1
// }];

$(()=>{

    // let users = JSON.parse(localStorage.getItem("users")) ?? null;
    
    
        saveUser("1","admin","desenvolupador@iesjoanramis.org",encryptedPassword,salt,1,1,1,1,1);
        console.log("admin creat");
        // location.reload();
     
   

});