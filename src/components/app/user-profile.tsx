
"use client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User as UserIcon, Sun, Moon, Monitor } from 'lucide-react';
import { useAuth, useUser } from "@/firebase";
import { useTheme } from "next-themes";


export function UserProfile() {
    const router = useRouter();
    const auth = useAuth();
    const { user } = useUser();
    const { setTheme } = useTheme();

    const handleLogout = async () => {
        await auth.signOut();
        router.push("/login");
    };

    const getInitials = (email?: string | null) => {
        if (!email) return <UserIcon />;
        return email.substring(0, 1).toUpperCase();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full p-1 pr-3"
                >
                    <Avatar className="h-8 w-8">
                        {user?.photoURL ? <AvatarImage src={user.photoURL} alt="Avatar" /> : null}
                        <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium">{user?.email || "Usuário"}</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName || "Usuário"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span>Tema</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" />
                            Claro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" />
                            Escuro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            <Monitor className="mr-2 h-4 w-4" />
                            Sistema
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem onClick={() => router.push('/configuracoes')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
