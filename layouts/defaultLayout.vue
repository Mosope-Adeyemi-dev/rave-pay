<template>
  <div class="whole-window">
    <Nuxt class="nuxt-component"/>
    <div class="disclaimer-container">
      <div class="disclaimer-msg">
        <img src="@/assets/images/icon.png" alt="Logo">
        <h1>Hi There, Welcome to RavePay!</h1>
        <p class="main-text">RavePay was built with user experience in mind, and giving the fact that it is a <span v-tooltip="'RavePay can be saved to your home screen,<br>and it would act just like a native mobile app'" class="tootltip-text">progress web app</span> for now, you would only be able to access the full application on a mobile phone's browser</p>
        <p class="action-text">You can put your PC browser into mobile view (through inspect) to fully access RavePay, however the experience might not be so great.</p>
        <p class="small-text">Feedback is very much welcome!</p>
        <p class="greeting">Built with 💖 by <a href="#">mosope.dev</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  head: {
    // ...
    link: [
      // ...
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      },
    ],
  },
  beforeMount(){
    // if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent)) {
    //     this.isMobile = true;
    // }
  },
  methods:{
  }
}
</script>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
html {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
input, button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
/* ::-webkit-scrollbar {
  display: none;
} */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
a, a::before, a::after{
  text-decoration: none;
}
/* .whole-window {
  width: 100%;
  height: 100vh;
  background: red;
  background-color: black;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('https://images.unsplash.com/photo-1660385936921-0c135f6ee473?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
} */
.tootltip-text{
  color: #00A91B;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
.disclaimer-container{
  height: 100vh;
  width: 100%;
  /* background: rebeccapurple; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.disclaimer-msg{
  text-align: center;
  width: 60%;
}
.disclaimer-msg img{
  height: 70px;
  width: 70px;
  object-fit: cover;
  object-position: center;
}
.disclaimer-msg h1{
  font-size: 45px;
  margin: 10px 0 20px;
}
.disclaimer-msg .main-text{
  font-size: 23px;
  margin-bottom: 10px;
}
.disclaimer-msg .action-text{
  margin: auto;
  width: 80%;
  font-size: 18px;
  color: darkgray;
}
.disclaimer-msg .small-text{
  margin-top: 30px;
}
.disclaimer-msg .greeting{
  /* color: gray; */
}
.disclaimer-msg .greeting a{
  color: #00A91B;
  text-decoration: underline;
  font-weight: 500;
}
@media screen and (max-width: 1300px) {
  .disclaimer-msg{
    width: 80%;
  }
}
@media screen and (max-width: 999px) {
  .disclaimer-msg{
    width: 90%;
  }
  .disclaimer-msg h1{
    font-size: 35px;
  }
  .disclaimer-msg .main-text{
    font-size: 19px;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 700px) {
  .disclaimer-container{
    display: none;
  }
}

.nuxt-component{
  /* background: red; */
  /* width: 100%; */
  height: 100vh;
  display: none;
}
@media screen and (max-width: 700px) {
  .nuxt-component{
    display: block;
  }
}
</style>
