<template>
    <div class="whole-modal">
        <div class="modal" data-aos="fade-up" data-duration="1500">
                <img src="@/assets/icons/arrow-left.svg" alt="Go back" @click="$emit('close-fund-wallet')">
                <p class="modal-name">Fund Account</p>
                <p class="convert-currency">
                    {{ formatCurrency(Number(amount) || 0)}}
                </p>
                <div class="input-box">
                    <label>Amount</label>
                    <input v-model="amount" type="number" required>
                </div>
                <div class="call-to-action">
                    <input v-if="!isLoading" type="submit" class="default-btn" value="FUND WALLET" :disabled="amount == ''" @click="$emit('fund-wallet', amount);">
                    <button v-if="isLoading" class="default-btn">
                        <img class="btn-loader" src="@/assets/icons/loader.svg" alt="">
                    </button>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                amount: 0,
                isLoading: false,
            }
        },
        methods: {
            formatCurrency(num) {
                return "₦" + num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
    }
    .modal-name{
        font-weight: 600;
        font-size: 16px;
        margin: 15px 0 25px;
    }
    .convert-currency{
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
    }
    .input-box {
        display: flex;
        flex-direction: column;
        margin-bottom: 32px;
    }
    .input-box label {
        font-size: 15px;
        font-size: 500;
        margin-bottom: 8px;
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
        bottom: 0;
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
    margin-bottom: 4vh;
}
.default-btn:disabled{
    /* background: rgb(36, 35, 35); */
    cursor: not-allowed;
}
</style>