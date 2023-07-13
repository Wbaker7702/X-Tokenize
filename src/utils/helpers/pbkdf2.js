
import pbkdf2 from 'pbkdf2';
import CryptoJS from 'crypto-js';

 /**
 * @function div2
 * @description
 * This function takes a number as input and recursively divides it by 2 until the result is less than
 * 630000. It then returns the floor value of the final result.
 * 
 * @param {number} num - The input number to be divided.
 * @returns {number} - The floor value of the final result after recursive division.
 */

export const div2 = (num)=>{
    num=num/2;
    if(num<630000)return Math.floor(num)
    else return div2(num)
}


export const generateSalt = (password,pin)=>{
    const itterations = 100000;
    

}

/**
 * @function encrypt
 * @description
 * This function takes data, a password, and a pin as input and encrypts the data using the PBKDF2 key
 * derivation function and AES encryption. The salt for the PBKDF2 function is generated by squaring the pin, and the
 * number of iterations is determined by the div2 function.
 * 
 * @param {string} data - The data to be encrypted.
 * @param {string} password - The password used for encryption.
 * @param {string} pin - The pin used to generate the salt and iterations for the PBKDF2 function.
 * @returns {Promise<string>} - The encrypted data as a string.
 */
 export const encrypt = async (data,password,pin) =>{
    try
    {
        let saltNumber = Number(pin)*Number(pin);
        let saltString = pbkdf2.pbkdf2Sync(password,saltNumber.toString(),100000,256,'sha256').toString();
        let itterations = div2(saltNumber);
        let keyLength = 256;
        let digest = 'sha256';
        let derivedKey = pbkdf2.pbkdf2Sync(password,saltString,itterations,keyLength,digest).toString();
        let encryptedData =CryptoJS.AES.encrypt(data,derivedKey).toString()
        return encryptedData;
    }
    catch(err)
    {
        console.log(`There was an error encrypting the data....`)
    }
}

/**
 * @function decrypt
 * @description
 * This function takes encrypted data, a password, and a pin as input and decrypts the data using the
 * PBKDF2 key derivation function and AES decryption. The salt for the PBKDF2 function is generated by squaring the pin,
 * and the number of iterations is determined by the div2 function.
 * 
 * @param {string} encrypted - The encrypted data to be decrypted.
 * @param {string} password - The password used for decryption.
 * @param {string} pin - The pin used to generate the salt and iterations for the PBKDF2 function.
 * @returns {Promise<string>} - The decrypted data as a string.
 */
export const decrypt = async(encrypted,password,pin)=>{
    try
    {
        let saltNumber = Number(pin)*Number(pin);
        let saltString = pbkdf2.pbkdf2Sync(password,saltNumber.toString(),100000,256,'sha256').toString();
        let itterations = div2(saltNumber);
        let keyLength = 256;
        let digest = 'sha256';
        
        let derivedKey = pbkdf2.pbkdf2Sync(password,saltString,itterations,keyLength,digest).toString();
        let bytes = CryptoJS.AES.decrypt(encrypted,derivedKey);
        let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }
    catch(err)
    {
        console.log(`There was an error decrypting the data....`)
    }
}

