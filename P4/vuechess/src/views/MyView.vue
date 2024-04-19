<template>
    <div>
        <div class="form">
            <h1>MyView</h1>
            {{ msg }}
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useTokenStore } from '@/stores/token';

export default {
    name: myView,
    setup() {
        const msg = ref('Welcome to the best chesspage ever!');
        const myView = async () => {
            const baseUrl = 'http://localhost:8000/api/v1/'; //mala práctica: debe hacerse una variable de entorno  
            const store = useTokenStore();

            try {
                const response = await fetch(baseUrl + 'myclassView/',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'token ' + store.token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    });
                const data = await response.json();
                if (!response.ok) {
                    //manejo de errores
                }
                if (data && data.auth_token) {
                    msg.value = data.message;
                    console.log(data);
                } else {
                    console.log('Error: Authentication token not found.');
                    //manejo de errores
                }
                console.log('Success:');
            }
            catch (error) {
                console.error(error);
                //manejo de errores
            }
        };
        onBeforeMount(() => {
            myView();
        });

        return {
            msg,
        };
    },
};
</script>