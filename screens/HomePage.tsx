import Button from "../src/components/Button";
import Input from "../src/components/Input";
import Card from "../src/components/Card";
import SearchInput from "../src/components/SearchInput";
import Header from "../src/components/Header";

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