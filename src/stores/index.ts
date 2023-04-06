import { createPinia, type Pinia } from "pinia";

export const setUpPinia = (): Pinia => {
    const pinia = createPinia();

    return pinia;
}