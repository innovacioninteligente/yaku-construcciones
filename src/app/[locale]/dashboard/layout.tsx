import { DashboardLayout } from "@/components/dashboard-layout";
import { getDictionary } from "@/lib/dictionaries";

export default async function Layout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: any } }) {
    const dict = await getDictionary(locale);
    return <DashboardLayout t={dict}>{children}</DashboardLayout>;
}
