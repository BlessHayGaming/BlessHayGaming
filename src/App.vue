<script src="./App.js"></script>
<template>
    <div id="app">
        <component :is="layouts[layout]"/>
    </div>
</template>