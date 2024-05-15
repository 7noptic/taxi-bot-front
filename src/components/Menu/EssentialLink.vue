<template>
  <q-item>
	<router-link :to="link" class="link" exact-active-class="active">
	  <q-item-section v-if="icon" avatar class="link__icon">
		<q-icon :name="icon" />
	  </q-item-section>

	  <q-item-section>
		<q-item-label class="link__text">{{ title }}</q-item-label>
	  </q-item-section>
	</router-link>
  </q-item>
</template>

<script lang="ts" setup>
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: ''
})
</script>

<style lang="scss" scoped>
  .link {
	display: flex;
	align-items: center;
	text-decoration: none;
	color: $dark;
	transition: 0.2s all ease-in-out;

	&.active {
	  color: $secondary;
	}

	&:hover {
	  color: $primary;
	}
  }
</style>
