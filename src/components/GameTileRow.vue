<script lang="ts">
import Tile from '@/sudoku/models/Tile';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GameTile extends Vue {
	@Prop() private tiles!: Tile[];
}
</script>
