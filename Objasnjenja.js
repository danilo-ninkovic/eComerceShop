//API  -------USERS--------userActions.js
//----------------------LOGIN----POST /api/users/login ---public-----------
/**authUser uzima iz body (email,password) => vraća {_id,name,email,isAdmim,token(generisani)}
 

//----------------------REGISTER---POST /api/users-------public---------
/**register uzima iz body (name,emai,password) => vraća  {_id,name,email,isAdmim,token(generisani)}
  */

//----------------------getUserProfile--GET----/api/users/profile----private-----
/**getUserProfile iz "protect" uzima req.user._id => vraća  {_id,name,email,isAdmim,}

//----------------------updateUserProfile--PUT----/api/users/profile----private-----
//updateUserProfile iz body uzima "ako je unesen" {_id,name,email,password,}=> vraća  {_id(isti),name,email,isAdmim,token(generisani)}*/

//-----middleware(protect)-----funkcija za token------
//iz req.headers.authorization uzima token, decodira ga da izvuče id i
//pomoću tog id-a pronađe Usera i on postaje req.user -- za daljnji request ciklus

//API  --------PRODUCTS-------productActions.js
//--------------getProducts------GET---/api/products-----public
//iz kolekcije Product => vraća [] svih product{} objekata

//------------getProductById----GET----/api/products/:id---public
//iz URL-a uzima id producta i vraća product {}
