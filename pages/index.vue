<template>
  <div class="whole-container">
    <div class="onboarding">
      <div>
        <div class="app-name">
          <h1>Rave Pay</h1>
        </div>
        <p class="app-slogan">Fast & Secure wallet you can trust.</p>
      </div>
    </div>
    <div class="call-to-action">
      <button class="default-btn" @click="$router.push('/login')">GET STARTED
        <img src="@/assets/icons/arrow-right.svg" alt="">
      </button>
      <a class="login-text" href="/vendor/login">RavePay For Businesses</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'defaultLayout'
}
</script>

<style scoped>
.whole-container{
  background-repeat: no-repeat;
  background-image: url('@/assets/images/home-screen-bg.png');
  background-size: contain;
  width: 100vw;
}
.onboarding{
  height: 75vh;
  /* background: rebeccapurple; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.onboarding div{
  text-align: center;
  /* background: red; */
  width: 100%;
}
.onboarding div .app-name{
  font-size: 25px;
  color: white;
  padding: 10px 30px;
  width: fit-content;
  margin: auto;
  border-radius: 50px;
  font-weight: 500;
  background: black;
}
.onboarding div .app-slogan{
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
  width: 80%;
  margin: auto;
  font-size: 30px;
  font-weight: 500;
}
.call-to-action{
  position: absolute;
  bottom: 5vh;
  left: 0;
  right: 0;
  text-align: center;
}
.call-to-action button {
  background: #EBB3FF;
  border-radius: 8px;
  color: black;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  border: 0;
  width: 90%;
  margin: 40px auto 20px;
  cursor: pointer;
}
.call-to-action button img{
  margin-left: 8px;
}
.login-text {
  font-weight: 500;
  font-size: 18px;
  color: green;
  text-decoration: underline;
}
</style>