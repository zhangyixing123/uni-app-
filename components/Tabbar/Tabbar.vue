<template>
	<view>
		<u-gap height="150"></u-gap>
		<u-tabbar
		   :value="value"
		   inactiveColor="#B1B1BA"
		   activeColor="#151517"
			:fixed="true"
			:border="false"
			:placeholder="false"
			zIndex="99"
		 >
		   <u-tabbar-item
		     v-for="tabitem in tablist"
		     :text="tabitem.text"
		     :key="tabitem.icon"
		     @click="tabChangeHandler"
		   >
		     <image
		       class="u-page__item__slot-icon"
		       slot="active-icon"
		       :src="tabitem.activeIcon"
		     ></image>
		     <image
		       class="u-page__item__slot-icon"
		       slot="inactive-icon"
		       :src="tabitem.inactiveIcon"
		     ></image>
		   </u-tabbar-item>
		 </u-tabbar>
	</view>
 
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'Tabbar',
  data () {
    return {

    };
  },
  computed: {
    ...mapState({
      value: state => state.tabbar.active,
      tablist: state => state.tabbar.list
    }),
  },
  methods: {
    ...mapMutations(['changeActiveIndex']),
    tabChangeHandler (e) {
      const { url } = this.tablist[e];
		uni.switchTab({
			url
		})
      this.changeActiveIndex(e);
    }
  }
};
</script>

<style>
.u-page__item__slot-icon {
  width: 20px;
  height: 20px;
}

>>>.u-tabbar__content__item-wrapper {
	background-color: #fefefe;
}
</style>
