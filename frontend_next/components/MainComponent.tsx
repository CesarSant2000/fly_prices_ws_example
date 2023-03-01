import {FormEvent, MouseEvent, useEffect, useState} from "react";
import io from 'socket.io-client'
import FlightClassIcon from '@mui/icons-material/FlightClass';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ReportIcon from '@mui/icons-material/Report';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import {
    Avatar,
    Box,
    Button,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {ChatMessageProps} from "@/components/chatMessage";

const websocketServer = 'http://localhost:2803';
const socket = io(websocketServer);

export interface ListenPurchaseData {
    name: string;
    message: string;
}

export default function MainComponent() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const startQty: ChatMessageProps = {name: 'system', message: '20'}
    const [messages, setMessages] = useState([startQty] as ChatMessageProps[]);
    const [currentPrice, setCurrentPrice] = useState(1000);
    const [availableSeats, setAvailableSeats] = useState(20);

    useEffect(
        () => {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('socket connected')
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('socket disconnected')
            });
            socket.on('listenPurchase', (data: ListenPurchaseData) => {
                console.log('listenPurchase', data);
                const newMessage: ChatMessageProps = {
                    name: data.name,
                    message: data.message
                }
                setAvailableSeats(parseInt(data.message));
                setMessages([...messages, newMessage]);
            });
        }, []
    )

    useEffect(
        () => {
            if (availableSeats > 10) {
                setCurrentPrice(1000);
            }
            if (availableSeats <= 10 && availableSeats > 5) {
                setCurrentPrice(1500);
            }
            if (availableSeats <= 5) {
                setCurrentPrice(2000);
            }
        }, [availableSeats]
    )

    function handleSubmit(e: FormEvent<HTMLButtonElement>) {
        e.preventDefault();
    }

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const seatsToPurchase = document.getElementById('seatsToPurchase') as HTMLInputElement;
        console.log('seatsToPurchase', seatsToPurchase.value);
        const newMessage = {
            name: 'user',
            message: (availableSeats - parseInt(seatsToPurchase.value))
        }
        socket.emit(
            'purchaseSeats',
            newMessage,
            () => {
                console.log('purchaseSeats', newMessage)
                const receivedMessage: ChatMessageProps = {
                    name: 'user',
                    message: (availableSeats - parseInt(seatsToPurchase.value)).toString()
                }
                setAvailableSeats(availableSeats - parseInt(seatsToPurchase.value));
                setMessages([...messages, receivedMessage]);
            }
        )
    }

    return (
        <>
            <Typography variant={'h4'}
                        padding={'1rem'}
                        textAlign={'center'}
            >
                Vuelos Quito - Miami
            </Typography>
            {currentPrice > 1000 &&
                <Grid item
                      xs={12}
                      sm={12}
                      md={12}
                      bgcolor={'#fc9751'}
                      borderRadius={'1rem'}
                      padding={'1rem'}
                      marginBottom={'3rem'}
                >

                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ReportIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Quedan solo " + availableSeats + " disponibles."}
                                          secondary={"El precio actual ha subido a $" + currentPrice}
                            />
                        </ListItem>
                    </List>
                </Grid>
            }
            <Grid item
                  xs={12}
                  sm={12}
                  md={12}
                  bgcolor={'#f3dc7d'}
                  borderRadius={'1rem'}
                  padding={'1rem'}
            >
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <SignalWifiStatusbar4BarIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Estatus Actual"/>
                        {isConnected &&
                            <Box bgcolor={"#9dcc71"}
                                 padding={'0.5rem'}
                                 borderRadius={'0.5rem'}
                                 minWidth={'3rem'}
                            >
                                <Typography variant={'body2'}
                                            textAlign={'center'}
                                >
                                    {isConnected ? 'Conectado' : 'Desconectado'}
                                </Typography>
                            </Box>
                        }
                        {!isConnected &&
                            <Box bgcolor={"#ff8686"}
                                 padding={'0.5rem'}
                                 borderRadius={'0.5rem'}
                                 minWidth={'3rem'}
                            >
                                <Typography variant={'body2'}
                                            textAlign={'center'}
                                >
                                    {isConnected ? 'Conectado' : 'Desconectado'}
                                </Typography>
                            </Box>
                        }
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FlightClassIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Asientos Disponibles"/>
                        <Box bgcolor={"#d3caca"}
                             padding={'0.5rem'}
                             borderRadius={'0.5rem'}
                             minWidth={'3rem'}
                        >
                            <Typography variant={'h6'}
                                        textAlign={'center'}
                            >
                                {availableSeats}
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PriceChangeIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Precio Actual"/>
                        <Box bgcolor={"#d3caca"}
                             padding={'0.5rem'}
                             borderRadius={'0.5rem'}
                             minWidth={'3rem'}
                        >
                            <Typography variant={'h6'}
                                        textAlign={'center'}
                            >
                                {"$"+currentPrice}
                            </Typography>
                        </Box>
                    </ListItem>
                </List>
            </Grid>
            <Grid item
                  xs={12}
                  sm={12}
                  md={12}
                  border={'3px solid #f3dc7d'}
                  borderRadius={'1rem'}
                  padding={'1rem'}
                  marginTop={'4rem'}
            >
                <Grid item
                      padding={'1rem'}
                >
                    <Typography variant={'h6'}
                                paddingY={'0.5rem'}
                    >
                        Cuantos asientos desea?
                    </Typography>
                    <TextField id="seatsToPurchase" label="Cantidad de Asientos" variant="outlined" fullWidth/>
                </Grid>
                <Grid item
                      padding={'2rem'}
                >
                    <Button variant="contained" fullWidth onClick={(e) => handleClick(e)}
                            onSubmit={(e) => handleSubmit(e)}>
                        Comprar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}