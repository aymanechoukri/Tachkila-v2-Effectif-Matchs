export const joueur = [
    {
  id: "1730112000000",  
  nom: "Karim Belkacem", 
  numero: 10,          
  poste: "MIL",          
  age: 25,        
  statut: "En forme",    
  capitaine: true,     
  position: null        
}
];


export const COLOR_MAP = {
    "Buteur" : "border-red-600",
    "Gardien" : "border-orange-500",
    "Milieu" : "border-green-500",
    "Defenseur" : "border-blue-500",
}

export const POSITIONS_AUTORISEES = {
    Gardien: [
        { value: "GB", label: "GB - Gardien" },
    ],

    Defenseur: [
        { value: "DG", label: "DG - Défenseur gauche" },
        { value: "DC1", label: "DC1 - Défenseur central 1" },
        { value: "DC2", label: "DC2 - Défenseur central 2" },
        { value: "DD", label: "DD - Défenseur droit" },
    ],

    Milieu: [
        { value: "MG", label: "MG - Milieu gauche" },
        { value: "MC1", label: "MC1 - Milieu central 1" },
        { value: "MC2", label: "MC2 - Milieu central 2" },
        { value: "MD", label: "MD - Milieu droit" },
    ],

    Buteur: [
        { value: "BU1", label: "BU1 - Buteur 1" },
        { value: "BU2", label: "BU2 - Buteur 2" },
    ]
};