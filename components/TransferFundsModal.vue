<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="whole-modal">
        <div class="modal" data-aos="fade-up" data-duration="1500">
            <!-- <form> -->
                <img src="@/assets/icons/arrow-left.svg" alt="Go back" @click="$emit('close-transfer-modal'); foundUser.lastname = ''; foundUser.firstname = ''; accountTag = ''; amount = ''; comment = ''">
                <p class="modal-name">Transfer Funds</p>
                <div class="input-box" @change="verifyTag(accountTag)">
                    <label>Recepient Tag</label>
                    <input v-model="accountTag" type="text" required>
                </div>
                <div class="input-box">
                    <label>Recepient Info</label>
                    <div class="fake-input">
                       <p v-if="!requestFailed" class="found-receipient">{{ foundUser.lastname?.toUpperCase() }} {{ foundUser.firstname?.toUpperCase() }}</p>
                       <p v-if="requestFailed" class="found-receipient error">INVALID ACCOUNT TAG</p>
                    </div>
                </div>
                <div class="input-box">
                    <label>Amount</label>
                    <input v-model="amount" type="number" required>
                </div>
                <div class="input-box last-input">
                    <label>Comment</label>
                    <input v-model="comment" type="text" required>
                </div>
                <div class="call-to-action">
                    <input v-if="!isLoading" type="submit" class="default-btn" value="TRANSFER" :disabled="amount == '' || accountTag == ''" @click="transferFund()">
                    <button v-if="isLoading" class="default-btn">
                        <img class="btn-loader" src="@/assets/icons/loader.svg" alt="">
                    </button>
                </div>
            <!-- </form> -->
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
    export default {
        props: {
        },
        data() {
            return {
                amount: '',
                accountTag: '',
                comment: '',
                isLoading: false,
                foundUser: {},
                requestFailed: undefined,
            }
        },
        methods: {
            transferFund() {
                this.$axios({
                    method: "POST",
                    url: "/wallet/transfer-fund",
                    data: {
                        amount: this.amount,
                        accountTag: this.accountTag,
                        comment: this.comment,
                    },
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    },
                }).then((onfulfilled) => {
                    this.showTransferModal = false
                }).catch((onrejected) => {
                    this.fundWalletIsLoading = false;
                    if (typeof onrejected.response.data.message !== "string") {
                        for (const x in onrejected.response.data.message) {
                            this.$toast.error(onrejected.response.data.message[x]);
                        }
                    }
                    else {
                        this.$toast.error(onrejected.response.data.message);
                    }
                });
            },
            verifyTag(tag) {
                console.log(tag);
                // this.fundWalletIsLoading = true;
                this.$axios({
                    method: "POST",
                    url: "/user/profile/find-by-username",
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                        'content-type': 'application/json',
                    },
                    data: {
                        accountTag: this.accountTag,
                    },
                }).then((onfulfilled) => {
                    // this.showTransferModal = false
                    // this.fundWalletIsLoading = false;
                    this.requestFailed = false
                    this.foundUser = onfulfilled.data.data
                }).catch((onrejected) => {
                    this.requestFailed = true
                    this.fundWalletIsLoading = false;
                    if (typeof onrejected.response.data.message !== "string") {
                        for (const x in onrejected.response.data.message) {
                            this.$toast.error(onrejected.response.data.message[x]);
                        }
                    }
                    else {
                        this.$toast.error(onrejected.response.data.message);
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .whole-modal {
        position: fixed;
        height: 100vh;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .modal {
        min-height: 40vh;
        position: absolute;
        bottom: 0;
        background: white;
        width: 100%;
        padding: 25px;
        border-radius: 16px 16px 0 0;
        transition: height 1s;
    }
    .modal-name{
        font-weight: 600;
        font-size: 16px;
        margin: 15px 0 25px;
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
    .last-input{
        margin-bottom: 10vh;
    }
    .input-box input, .fake-input{
        width: 100%;
        height: 56px;
        border: 1px solid #DFDFDF;
        border-radius: 8px;
        padding-left: 10px;
        font-size: 18px;
    }
    .fake-input{
        background: whitesmoke;
        display: flex;
        align-items: center;
    }
    .found-receipient{
        color: gray;
        font-size: 16px;
        font-weight: 600;
    }
    .found-receipient.error{
        color: red;
    }
    .input-box input:focus {
        outline: none;
        border: 1px solid gray;
    }
    .call-to-action{
        position: absolute;
        bottom: 4vh;
        left: 0;
        right: 0;
        text-align: center;
}
.call-to-action .default-btn{
    /* background: black; */
    background: #EBB3FF;
    color: black;
    border-radius: 8px;
    /* color: white; */
    font-size: 20px;
    font-weight: 500;
    height: 55px;
    border: 0;
    width: 90%;
    cursor: pointer;
}
.default-btn:disabled{
    /* background: rgb(36, 35, 35); */
    cursor: not-allowed;
}
</style>