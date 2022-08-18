<template>
    <div class="whole-container">
        <div class="login-sect">
            <h1 class="greeting">Get started with RavePay!</h1>
            <div class="input-sect">
                <form>
                    <div class="input-box">
                        <label>Firstname</label>
                        <input v-model="firstname" type="text" required>
                    </div>
                    <div class="input-box">
                        <label>Lastname</label>
                        <input v-model="lastname" type="text" required>
                    </div>
                    <div class="input-box">
                        <label>Email</label>
                        <input v-model="email" type="email" required>
                    </div>
                    <div class="input-box">
                        <label>Password</label>
                        <input v-model="password" type="password" required>
                    </div>
                </form>
            </div>
        </div>
        <p class="vendor-alert">Already got an account?
            <NuxtLink to="/login" class="highlight">Login here</NuxtLink>
        </p>
        <div class="call-to-action">
            <NuxtLink v-if="!isLoading" to="/" class="back">
                Go Back
            </NuxtLink>
            <input v-if="!isLoading" type="submit" class="default-btn" value="REGISTER" :disabled="email == '' || password == ''" @click="signup()">
            <button v-if="isLoading" class="default-btn">
                <img class="btn-loader" src="@/assets/icons/loader.svg" alt="">
            </button>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        layout: 'defaultLayout',
        data() {
            return {
                email: '',
                password: '',
                isLoading: false,
                firstname: '',
                lastname: '',
            }
        },
        methods: {
        signup () {
                this.isLoading = true;
                this.$axios({
                    method: 'POST',
                    url: 'auth/customer/signup',
                    data: {
                        email:  this.email,
                        password: this.password,
                        firstname: this.firstname,
                        lastname: this.lastname,
                    }
                }).then((onfulfilled) => {
                    this.isLoading = false
                    this.$toast.success(onfulfilled.data.message);
                    Cookies.set('token', onfulfilled.data.data.token, { expires: 1 })
                    this.$router.push('/onboarding/create-account-tag');
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
        },
       }
    }
</script>

<style scoped>
    .whole-container {
        position: relative;
        height: 100vh;
        width: 100%;
        padding-top: 40px;
        overflow-y: auto;
    }
    .login-sect {
        width: 90%;
        height: 75vh;
        /* background: red; */
        margin: auto;
        overflow-y: auto;
    }
    .greeting {
        font-weight: 600;
        font-size: 25px;
    }
    .input-sect {
        margin-top: 32px;
    }
    .input-box {
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
    }
    .input-box label {
        font-size: 15px;
        font-size: 500;
        margin-bottom: 8px;
    }
    .input-box input {
        width: 100%;
        height: 52px;
        border: 1px solid #DFDFDF;
        border-radius: 8px;
        padding-left: 10px;
        font-size: 18px;
    }
    .input-box input:focus {
        outline: none;
        border: 1px solid gray;
    }
    .call-to-action {
        position: absolute;
        bottom: 3vh;
        left: 0;
        right: 0;
        text-align: center;
    }
    .call-to-action .default-btn {
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
    .default-btn:disabled {
        background: rgb(36, 35, 35);
        cursor: not-allowed;
    }
    .vendor-alert {
        text-align: center;
        font-size: 18px;
    }
    .vendor-alert .highlight {
        color: #00A91B;
        font-weight: 500;
        text-decoration: underline;
    }
    .services {
        height: 56px;
        width: 100%;
        border: 1px solid #DFDFDF;
        border-radius: 8px;
        /* padding-left: 10px; */
        /* font-size: 14px; */
    }
    .back{
        margin-bottom: 10px;
        color: #00A91B;
        font-weight: 500;
        text-decoration: underline;
    }
</style>