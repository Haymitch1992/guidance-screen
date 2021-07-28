<template>
    <div>
        <headerbox></headerbox>
        <stopbox :stopObj="stopObj" fullScreen="true"></stopbox>
    </div>
</template>

<script>
import headerbox from '../components/headerbox.vue';
import stopbox from '../components/stopbox.vue';
export default {
    name: '进站检票',
    components: {
        headerbox,
        stopbox
    },
    data() {
        return {
            stopObj: {
                text1: '禁止进站',
                text2: 'No Entry',
                text3: '此处距离进站口12米',
                text4: 'It is 12 meters away from the entrance'
            }
        };
    }
};
</script>

<style></style>
