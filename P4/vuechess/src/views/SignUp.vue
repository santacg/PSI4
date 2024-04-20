<template>
  <div class="wrapper">
    <form class="sign-up-form">
      <h1>Mychess Sign Up</h1>
      <div class="input-box">
        <input type="text" placeholder="Email Address" required>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Password" required>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Confirm Password" required>
      </div>
    </form>
    <button type="submit" class="btn">Sign Up</button>
  </div>
</template>
<script>
</script>
<style scoped>
.wrapper {
  width: 450px;
  background: transparent;
  border: 4px;
  border-color: solid rgba(255, 255, 255, .8);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .7);
  border-radius: 20px;
  padding: 30px 40px;
}

.wrapper .sign-up-form h1 {
  text-align: center;
  font-weight: bolder;
}

.wrapper .sign-up-form .input-box {
  width: 100%;
  height: 50px;
  margin: 30px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  border: 2px solid rgba(255, 255, 255, .4);
  border-radius: 40px;
  padding: 20px 45px 20px 20px;
  font-size: 15px;
  color: whitesmoke;
}

.input-box input::placeholder{
  color: rgba(255, 255, 255, 0.4);
}

.wrapper .btn {
  width: 100%;
  height: 45px;
  background: white;
  border: none;
  outline: none;
  border-radius: 40px;
  font-weight: bolder;
  transition: box-shadow 0.3s ease, transform 0.1s ease;
}

.wrapper .btn:hover{
  border-color: black;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .4);
}

.wrapper .btn:active {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);  
  transform: translateY(2px); 
}

</style>
