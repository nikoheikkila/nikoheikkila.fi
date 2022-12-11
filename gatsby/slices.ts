interface Slice {
    id: string;
    component: string;
    context?: Record<string, unknown>;
}

const slices: Slice[] = [{ id: "sidebar", component: "menu.tsx" }];

export default slices;
