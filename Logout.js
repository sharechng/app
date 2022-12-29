export const Logout_=(props)=>{
    alert("Your session has expired. Please login again.");
    props.navigation.replace("Login");

}