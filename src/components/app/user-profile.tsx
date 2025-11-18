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
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { LogOut, Settings } from 'lucide-react';


export function UserProfile() {
    const router = useRouter();

    const handleLogout = () => {
        router.push("/");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full p-1 pr-3"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://picsum.photos/seed/user-avatar/100/100`} alt="Avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium">aluno@ocorretor.ia</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Usuário</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            aluno@ocorretor.ia
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
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
