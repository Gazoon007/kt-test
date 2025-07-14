<script lang="ts" setup>
import UserHeader from '@/components/UserHeader.vue'
import UserMainCard from '@/components/UserMainCard.vue'

const demoUser = {
  avatar: '/avatar.png',
  name: 'Mr. Kirana Taekwondo',
  lastOnline: '2 days ago',
}
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa]">
    <UserHeader
      :avatar-url="demoUser.avatar"
      :name="demoUser.name"
      @add-user="() => {}"
    />
    <UserMainCard />
  </div>
</template>
