import { useEffect, useState } from "react";
import { Dimensions, TextInput, StyleSheet, Text, View, Alert } from "react-native";
import IconButton from "../../components/IconButton";
import PrimaryButton from "../../components/PrimaryButton";
import { resetPassword } from "../../util/AuthManager";
import { emailChecker } from "../../util/helper";
import useLoadFonts from '../../util/fonts/loadfont';
import { FontStyle } from "../../util/fonts/fontstyles";


let componentWidth = 0;
const width = Dimensions.get('window').width;

function ForgetPassword({ navigation }) {
    function measureView(event){
        componentWidth = event.nativeEvent.layout.width;
    }
    function goBack(){
        navigation.goBack();
    }

    const [filled, setFilled] = useState(false);
    const [email, setEmail] = useState("");

    useLoadFonts();

    function emailHandler(enteredEmail){
        setEmail(enteredEmail);
    }

    function sendEmail(){
        if(!emailChecker(email)){
            Alert.alert(
                "Unsuccessful",
                "Error: Email Address entered does not follow the valid format",
                [{ text: "Okay", style: "destructive" }]
            );
        }else{
            resetPassword(email)
            navigation.navigate('Login');
            Alert.alert(
                "Email sent",
                "Email has been sent to your email address, please check your spam box to see if it is there.",
                [{ text: "Okay", style: "destructive" }]
            );
        }
    }
    useEffect(()=>{
        if(email!==""){
            setFilled(true);
        }
    },[email])


    return (
        <View style={styles.page}>
            <View style={styles.topContent}>
                <IconButton onPress={goBack} icon="arrow-back" size={28} color="black"/>
                <Text style={styles.title} onLayout={(event)=>{
                    measureView(event);
                }}>Forget Password</Text>
            </View>
            <View style={styles.inputConfig}>
                <TextInput style={styles.inputStyles} value={email} onChangeText={emailHandler} placeholder="Enter your email address"/>
                <Text style={[{color: '#57636C'}]}>We will need to verify your email with our database to reset your password, please enter the email associated with your account above.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton text="Verify email" onSuccess={filled} onAttempt={sendEmail}/>
            </View>
        </View>
  );
}

export default ForgetPassword;

const styles = StyleSheet.create({
    page:{
        backgroundColor:'white', 
        flex: 1
    },
    topContent: {
        flexDirection:'row',
        marginVertical: 40,
        alignItems: 'center'
    },
    title:{
        marginLeft: (width - componentWidth)/5
    },
    inputConfig: {
        marginHorizontal: "5%",
        flexDirection: 'column',
    },
    inputStyles:{
        borderRadius: 6,
        fontSize: 14,
        padding: 12,
        borderColor: '#DBE2E7',
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        marginBottom: 20
    },
    buttonContainer:{
        marginVertical:30
    }
});
