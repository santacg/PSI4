<template>
    <div class="container">
        <div class="wrapper">
            <h1>Log Out</h1>
            <p>Are you sure you want to log out?</p>
            <button class="btn1">Yes</button>
            <button class="btn2">No</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import router from '../router';

export default {
    name: 'LogOut',

    setup() {
        const logOut = async () => {
            store.clearToken();

            router.push('/login').catch(err => {
                console.error('Routing error:', err);
            });
        };

        // Podrías necesitar retornar la función de logOut si planeas usarla directamente en la plantilla
        return {
            logOut
        };
    },
};
</script>

<style scoped>
.container {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img2.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    place-content: center;
    align-items: center;
}

.wrapper {
    width: 400px;
    height: 250px;
    position: absolute;
    background: transparent;
    backdrop-filter: blur(50px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .9);
    border-radius: 20px;
    padding: 30px 40px;
    place-content: center;
    text-align: center;
}

.wrapper h1 {
    font-weight: bold;
    color: rgba(255, 255, 255, .4);
    font-size: 38px;
    margin-bottom: 20px;
}

.wrapper p {
    color: white;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
}

.wrapper .btn2 {
    width: 125px;
    height: 40px;
    background: white;
    border: none;
    outline: none;
    border-radius: 40px;
    font-weight: bolder;
    transition: box-shadow 0.3s ease, transform 0.1s ease;
    margin: 10px;
    cursor: pointer;
}

.wrapper .btn1 {
    width: 125px;
    height: 40px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .4);
    color: white;
    outline: none;
    border-radius: 40px;
    font-weight: bolder;
    transition: box-shadow 0.3s ease, transform 0.1s ease;
    margin: 10px;
    cursor: pointer;
}
</style>
