# Generatore Probabili Formazioni

Tool statico in `HTML`, `CSS` e `JavaScript vanilla` per creare grafiche editoriali calcio con esportazione `JPEG` via `Canvas HTML5`.

## 1. Come aprire il tool

1. Apri la cartella del progetto.
2. Fai doppio clic su `index.html` oppure aprilo nel browser.
3. Non serve alcun server locale o installazione di dipendenze.

## 2. Come generare una grafica

1. Il tool lavora in formato fisso `1200x675`.
2. Inserisci info partita, background, colori e dati delle due squadre.
3. Compila i `titolari` con esattamente 11 righe per squadra.
4. Premi `Carica esempio` per vedere subito un layout completo.
5. L’anteprima si aggiorna automaticamente mentre modifichi i campi.

## 3. Come esportare il JPEG

1. Quando il pulsante si abilita, clicca su `Scarica JPEG 1200x675`.
2. Il file viene salvato localmente con nome automatico:
   `pronostico-[squadra-sinistra]-[squadra-destra]-formazioni.jpeg`

## 4. Come modificare le coordinate dei moduli

Le coordinate sono definite in [`script.js`](/Users/mancimat/Library/CloudStorage/OneDrive-TheStarsGroup/Desktop/Probabili formazioni/script.js) dentro l’oggetto `formations`.

Ogni modulo ha 11 coordinate:

```js
"4-3-3": [
  { x: 0.10, y: 0.50 },
  { x: 0.22, y: 0.80 }
]
```

- `x` è relativa alla metà campo della squadra.
- `y` va da `0` in alto a `1` in basso.
- La squadra di destra viene specchiata automaticamente in fase di disegno.

## 5. Come aggiungere un nuovo modulo

1. Apri [`script.js`](/Users/mancimat/Library/CloudStorage/OneDrive-TheStarsGroup/Desktop/Probabili formazioni/script.js).
2. Aggiungi una nuova chiave dentro `formations`.
3. Inserisci 11 coordinate nell’ordine:
   portiere, difensori, centrocampisti, trequartisti/ali, attaccanti.
4. Salva il file e ricarica `index.html`.
5. Il modulo apparirà automaticamente nelle select del form.

## 6. Come cambiare colori e font

- I colori dell’interfaccia sono in [`style.css`](/Users/mancimat/Library/CloudStorage/OneDrive-TheStarsGroup/Desktop/Probabili formazioni/style.css), sezione `:root`.
- I font del canvas sono definiti in [`script.js`](/Users/mancimat/Library/CloudStorage/OneDrive-TheStarsGroup/Desktop/Probabili formazioni/script.js) nelle funzioni `drawHeader`, `drawPlayer` e `drawBoxContent`.
- Colori marker e bordi marker si cambiano direttamente dal form senza modificare il codice.
