<script lang="ts">
    // Lógica de layout, como verificar se o usuário está logado, AQUIII
    // Se não estiver logado, redireciona para a página de login.
</script>

<div class="provider-area">
    <aside class="sidebar">
        <h2>Provider Menu</h2>
        <nav>
            <ul>
                <li><a href="/provider/dashboard">Dashboard</a></li>
                <li><a href="/provider/services">My Services</a></li>
                <li><a href="/provider/schedule">My Schedule</a></li>
                <li><a href="/provider/profile">Profile</a></li>
            </ul>
        </nav>
    </aside>
    <main class="content">
        <slot />
    </main>
</div>

<style>
    .provider-area {
        display: flex;
    }
    .sidebar {
        width: 250px;
        background-color: #f4f4f4;
        padding: 1rem;
        height: 100vh;
    }
    .content {
        flex: 1;
        padding: 1rem;
    }
    nav ul {
        list-style: none;
        padding: 0;
    }
    nav a {
        display: block;
        padding: 0.5rem;
        text-decoration: none;
        color: #333;
    }
</style>