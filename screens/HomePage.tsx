import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";

const HomePage = () => {
return (
    <Card>
    <Header type="home" onSearch={(text) => console.log(text)} />
    <Input
        label="Nome"
        description="Digite seu nome completo"
        value=""
        onChangeText={(text) => console.log(text)}
        placeholder="Seu nome"
    />
    <Button title="Enviar" onPress={() => console.log("Botão pressionado")} />
    </Card>
);
}
export default HomePage;