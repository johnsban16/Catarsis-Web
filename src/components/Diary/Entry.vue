

<<template>
  
</template>

<script>
export default {
    computed: {
        entry () {
            return this.$store.getters.loadedEntry()
        }
    }

}
</script>
