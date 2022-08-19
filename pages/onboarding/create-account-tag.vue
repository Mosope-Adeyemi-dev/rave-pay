<template>
    <div class="whole-container">
       <form>
            <div class="login-sect">
                <h1 class="greeting">Let's get you setup!</h1>
                <p class="info">Your account tag/username is basically your bank account number for your wallet, use this to receive and send funds on RavePay.</p>
                <div class="input-sect">
                        <div class="input-box">
                            <label>Account Tag / Username</label>
                            <input v-model="accountTag" type="text" required>
                            <p v-if="tagStatus === false" class="status-msg unavailable">Uh Oh... This tag is unavailable.</p>
                            <p v-if="tagStatus" class="status-msg available">Hurray! This tag is available for use.</p>
                        </div>
                </div>
            </div>
            <div class="call-to-action">
                <p v-if="!isLoading" class="back" @click="$router.push('/login')">
                    Go Back
                </p>
                <input v-if="!isLoading & !tagVerified" type="submit" class="default-btn" value="Verify Tag" :disabled="accountTag == ''" @click="verifyTag()">
                <input v-if="!isLoading & tagStatus" type="submit" class="default-btn" value="Confirm Tag" :disabled="accountTag == ''" @click="setTag()">
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
            accountTag: '',
            tagStatus: undefined,
            isLoading: false,
            tagVerified: false,
        }
       },
       mounted(){
        this.checkCookie();
       },
       methods: {
        checkCookie () {
            if (Cookies.get('token') === undefined) {
                this.$router.push('/login')
                this.$toasted.error('Your session has expired')
            }
        },
        verifyTag () {
                this.isLoading = true;
                this.$axios({
                    method: 'GET',
                    url: `/user/profile/verify-account-tag/${this.accountTag}`,
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                }).then((onfulfilled) => {
                    this.isLoading = false
                    this.tagStatus = true
                    this.tagVerified = true
                }).catch((onrejected) => {
                    this.tagStatus = false
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
        setTag () {
                this.isLoading = true;
                this.$axios({
                    method: 'PUT',
                    url: `user/profile/account-tag/setup`,
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                    data: {
                        accountTag: this.accountTag
                    },
                }).then((onfulfilled) => {
                    this.isLoading = false
                    this.tagStatus = true
                    this.$toast.success(onfulfilled.data.message);
                    this.$router.push('/onboarding/pin-setup');
                    // this.$router.push('/dashboard');
                }).catch((onrejected) => {
                    this.tagStatus = false
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
.info{
    color: gray;
    font-size: 14px;
    margin-top: 10px;
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