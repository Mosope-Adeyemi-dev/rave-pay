<template>
    <div class="whole-modal">
        <div class="modal" data-aos="fade-up" data-duration="1500">
            <!-- <form> -->
                <img src="@/assets/icons/arrow-left.svg" alt="Go back" @click="$emit('close-transfer-modal')">
                <p class="modal-name">Transfer Funds</p>
                <div class="input-box">
                    <label>Recepient Tag</label>
                    <input v-model="accountTag" type="text" required>
                    {{ foundUser.firstname }} {{ foundUser.lastname }}
                </div>
                <input value=" Verify Tag " type="submit" @click="$emit('verify-account-tag', accountTag)">
                <div class="input-box">
                    <label>Amount</label>
                    <input v-model="amount" type="number" required>
                </div>
                <div class="input-box last-input">
                    <label>Comment</label>
                    <input v-model="comment" type="text" required>
                </div>
                <div class="call-to-action">
                    <input v-if="!isLoading" type="submit" class="default-btn" value="TRANSFER" :disabled="amount == '' || accountTag == ''" @click="$emit('transfer-funds', {amount, accountTag, comment}); amount = ''">
                    <button v-if="isLoading" class="default-btn">
                        <img class="btn-loader" src="@/assets/icons/loader.svg" alt="">
                    </button>
                </div>
            <!-- </form> -->
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            foundUser: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                amount: '',
                accountTag: '',
                comment: '',
                isLoading: false,
            }
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
    .input-box input {
        width: 100%;
        height: 56px;
        border: 1px solid #DFDFDF;
        border-radius: 8px;
        padding-left: 10px;
        font-size: 18px;
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