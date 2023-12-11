<template>
    <div class="whole-container">
       <form>
            <div class="login-sect">
                <h1 class="greeting">Hi, Welcome back 👋</h1>
                <div class="input-sect">
                        <div class="input-box">
                            <label>Email</label>
                            <input v-model="email" type="email" required>
                        </div>
                        <div class="input-box">
                            <label>Password</label>
                            <input v-model="password" type="password" required>
                        </div>
                </div>
                <p class="vendor-alert">Create an <NuxtLink to="/signup" class="highlight">account!</NuxtLink></p>
                <br>
                <p class="vendor-alert">OR</p>
                <br>

                <div class="demo-details">
                    <p class="demo-title">Demo Account Details</p>
                    <p>Email: demo@test.com</p>
                    <p>Password: Test123@</p>
                    <p>Pin: 1234</p>
                </div>
            </div>
            <div class="call-to-action">
                <p v-if="!isLoading" class="back" @click="$router.push('/')">
                    Go Back
                </p>
                <input v-if="!isLoading" type="submit" class="default-btn" value="LOGIN" :disabled="email == '' || password == ''" @click="login()">
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
            email: '',
            password: '',
            isLoading: false,
        }
       },
       methods: {
        login () {
                this.isLoading = true;
                this.$axios({
                    method: 'POST',
                    url: '/auth/login',
                    data: {
                        email:  this.email,
                        password: this.password,
                    }
                }).then((onfulfilled) => {
                    this.isLoading = false
                    Cookies.set('token', onfulfilled.data.data.token, { expires: 1 })
                    // localStorage.setItem('Token', onfulfilled.data.data.token)
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
        },
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
.input-box{
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
}
.input-box label{
    font-size: 15px;
    font-size: 500;
    margin-bottom: 8px;
}
.input-box input{
    width: 100%;
    height: 56px;
    border: 1px solid #DFDFDF;
    border-radius: 8px;
    padding-left: 10px;
    font-size: 18px;
}
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
.vendor-alert{
    text-align: center;
    font-size: 18px;
}
.vendor-alert .highlight{
    color: #00A91B;
    font-weight: 500;
    text-decoration: underline;
}
.demo-details {
    width: 100%;
    background-color: #000;
    margin-top: 10px;
    color: #DFDFDF;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}
.demo-title {
    font-weight: 600;
    font-size: 16px;
}
</style>