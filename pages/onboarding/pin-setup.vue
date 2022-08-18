<template>
    <div class="whole-container">
       <form>
            <div class="login-sect">
                <h1 class="greeting">Create Pin</h1>
                <p class="info">Your transaction pin will be required to process transfer of funds on RavePay, remember to keep your pin private buddy!</p>
                <div v-if="!confirmPassword" class="input-sect">
                    <div class="pin-box">
                        <input v-model="digit_1" type="text" class="auto-input" required maxlength="1" @keyup="nextInput">
                        <input v-model="digit_2" type="text" class="auto-input" required maxlength="1">
                        <input v-model="digit_3" type="text" class="auto-input" required maxlength="1">
                        <input v-model="digit_4" type="text" class="auto-input" required maxlength="1">
                    </div>
                    <p class="input-action">Enter a 4-Digit Pin</p>
                </div>
                <div v-if="confirmPassword" class="input-sect">
                    <div class="pin-box">
                        <input v-model="digit_1s" type="text" class="auto-input" required maxlength="1" @keyup="nextInput">
                        <input v-model="digit_2s" type="text" class="auto-input" required maxlength="1">
                        <input v-model="digit_3s" type="text" class="auto-input" required maxlength="1">
                        <input v-model="digit_4s" type="text" class="auto-input" required maxlength="1">
                    </div>
                    <p class="input-action">Re-Enter your 4-Digit Pin</p>
                </div>
            </div>
            <div class="call-to-action">
                <p v-if="!isLoading" class="back" @click="$router.push('/onboarding/create-account-tag')">
                    Go Back
                </p>
                <input v-if="!isLoading && !confirmPassword" type="submit" class="default-btn" value="CONFIRM PIN" :disabled="digit_1 == '' || digit_2 == '' || digit_3 == '' || digit_4 == ''" @click.prevent="confirmPassword = true">
                <input v-if="!isLoading && confirmPassword" type="submit" class="default-btn" value="CONTINUE" :disabled="digit_1 + digit_2 + digit_3 + digit_4 != digit_1s + digit_2s + digit_3s + digit_4s" @click="setTransactionPin()">
                <button v-if="isLoading" class="default-btn">
                    <img class="btn-loader" src="@/assets/icons/loader.svg" alt="">
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        layout: 'defaultLayout',
       data () {
        return {
            isLoading: false,
            confirmPassword: false,
            digit_1: '',
            digit_2: '',
            digit_3: '',
            digit_4: '',
            digit_1s: '',
            digit_2s: '',
            digit_3s: '',
            digit_4s: ''
        }
       },
       methods: {
        nextInput () {
            const inputs = document.getElementsByClassName('auto-input')
            Array.from(inputs).forEach((inpt) => {
                inpt.addEventListener('keyup', (event) => {
                if (inpt.value.length === 1) {
                    inpt.nextElementSibling?.focus()
                }
                })
            })
        },
        confirmPin(){
            // if(this.digit_1 + this.digit_2 + this.digit_3 + this.digit_4 === this.digit_1s + this.digit_2s + this.digit_3s + this.digit_4s){

            // }
        },
        setTransactionPin(){
                this.isLoading = true;
                this.$axios({
                    method: 'PUT',
                    url: `/wallet/pin/set`,
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                    data: {
                        pin: this.digit_1 + this.digit_2 + this.digit_3 + this.digit_4
                    }
                }).then((onfulfilled) => {
                    this.isLoading = false
                    this.$toast.success(onfulfilled.data.message);
                    this.$router.push('/dashboard');
                }).catch((onrejected) => {
                    this.isLoading = false
                    if  (typeof onrejected.response.data.message !== 'string'){
                    for (const x in onrejected.response.data.message){
                        this.$toast.error(onrejected.response.data.message[x]);
                    }
                    }  else {
                        this.$toast.error(onrejected.response.data.message);
                    }
                })
        }
       }
    }
</script>

<style scoped>
.whole-container{
    position: relative;
    height: 100vh;
    width: 100%;
    padding-top: 40px;
}
.login-sect{
    width: 90%;
    margin: auto;
}
.greeting{
    font-weight: 600;
    font-size: 25px;
}
.input-sect{
    margin-top: 32px;
}
.info{
    color: gray;
    font-size: 14px;
    margin-top: 10px;
}
.pin-box{
    display: flex;
    width: 100%;
    justify-content: center;
    column-gap: 20px;
}
.pin-box input{
    width: 60px;
    height: 60px;
    border-radius: 8px;
    border: 1px solid #DFDFDF;
    font-size: 25px;
    text-align: center;
}
.input-action{
    text-align: center;
    margin-top: 10px;
}
.input-box{
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    border: 1px solid #DFDFDF;
    border-radius: 8px;
}
/* .input-box label{
    font-size: 15px;
    font-size: 500;
    margin-bottom: 8px;
} */
/* .input-box input{
    width: 100%;
    height: 56px;
    border: 1px solid #DFDFDF;
    border-radius: 8px;
    padding-left: 10px;
    font-size: 18px;
} */
.input-box input:focus{
    outline: none;
    border: 1px solid gray;
}
.call-to-action{
    position: absolute;
    bottom: 3vh;
    left: 0;
    right: 0;
    text-align: center;
}
.call-to-action .default-btn{
    background: black;
    border-radius: 8px;
    color: white;
    font-size: 20px;
    font-weight: 500;
    height: 55px;
    border: 0;
    width: 90%;
    cursor: pointer;
}
.default-btn:disabled{
    background: rgb(36, 35, 35);
    cursor: not-allowed;
}
.back{
    margin-bottom: 10px;
    color: #00A91B;
    font-weight: 500;
    text-decoration: underline;
}
.status-msg{
    margin-top: 5px;
    font-size: 14px;
}
.unavailable{
    color: red;
}
.available{
    color: #00A91B;
}
</style>