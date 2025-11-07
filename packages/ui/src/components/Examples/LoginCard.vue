<template>
  <BuCard class="relative w-[350px] overflow-hidden">
    <BuCardHeader>
      <BuCardTitle>Login</BuCardTitle>
      <BuCardDescription>Enter your credentials to access your account.</BuCardDescription>
    </BuCardHeader>
    <BuCardContent>
      <form @submit.prevent>
        <div class="grid w-full gap-4">
          <div class="flex flex-col gap-1.5">
            <BuLabel for="email">Email</BuLabel>
            <BuInput id="email" type="email" placeholder="Enter your email" />
          </div>
          <div class="flex flex-col gap-1.5">
            <BuLabel for="password">Password</BuLabel>
            <BuInput id="password" type="password" placeholder="Enter your password" />
          </div>
        </div>
      </form>
    </BuCardContent>
    <BuCardFooter class="flex justify-between">
      <BuButton variant="outline">Register</BuButton>
      <BuButton>Login</BuButton>
    </BuCardFooter>
    <BuBorderBeam :duration="8" :size="100" />
  </BuCard>
</template>

<script setup lang="ts">
import { BuCard, BuCardHeader, BuCardTitle, BuCardDescription, BuCardContent, BuCardFooter, BuButton, BuInput, BuLabel, BuBorderBeam } from '../index'
</script>

