// app/index.tsx
import { Redirect } from 'expo-router';
import { useSessionStore } from '../store/session';

export default function IndexRedirect() {
    const user = useSessionStore((s) => s.user);

    if (user) {
        return <Redirect href="/(app)/modules" />;
    }

    return <Redirect href="/(auth)/login" />;
}
