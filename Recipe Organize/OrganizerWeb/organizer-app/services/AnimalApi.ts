export interface Animal {
    name: string,
    color: string,
    age: number
}

export const getAnimal = async (): Promise<Animal[]> => {
    const res = await fetch('http://localhost:3000/animal.json',{cache:'no-store'});
    const jsonBody = await res.json();
    return jsonBody as Animal[];
}