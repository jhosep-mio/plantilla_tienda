<!DOCTYPE html>
<html lang="es">
<head>
    <style>
        .title {
            width: 100%
        }
        h1 {
            text-align: center;
            color: #916FAE;
            width: 100%;
        }
        .ctn1 div {
            display: inline-block;
        }
        .separator {
            width: 80%;
            margin: 0 auto;
            border-bottom: 2px solid #916FAE;
        }
        .img1 {
            width: 100%;
            height: 100%;
            margin-bottom: 20px;
        }
        .img1 img {
            width: 70%;
            display: block;
            margin: 0 auto;
        }
        .cuerpo{
            width: 100%;
        }
        .cuerpo div {
            width: 100%;
            display: inline-block;
            margin-bottom: 40px;
        }

        .info {
            width: 50%;
        }

        .info p {
            font-size: 18px;
        }

        .img2 {
            width: 25%;
        }

        .img2 img {
            width: 250px;
        }

        .btn-ctn {
            margin: 20px auto;
            color: white !important;
            width: 50%;
            text-align: center;
        }


        .btn-llamar {
            width: 20%;
            text-decoration: none;
            display: block;
            background: #916FAE;
            padding: 10px 20px;
            color: white !important;
            border-radius: 8px;
            margin: 0 auto;
            margin-bottom: 20px;
            text-align: center;
            transition: all .3s;
        }

        .btn-llamar:hover {
            background-color: #000;
        }
    </style>
</head>

<body>
    <div class="ctn1">
        <div class="img1">
            <img src="https://radiologiadental.opticasintegra.com/assets/logo-4717f647.png">
        </div>

        <div class="title">
            <h1>¡Ya puede visualizar los resultados de su paciente!</h1>
        </div>
    </div>
    <div class="separator">
    </div>
    <div class="cuerpo">
        <div class="info">
            <p>Su paciente {{$name}} se esta atendiendo con nosotros, para visualizar sus imagenes y resultado puede ingresar al siguiente <a href="https://radiologiadental.opticasintegra.com/resultados">link</a> o presionar el boton de ingresar.</p>

            <h2>Le recordamos que su usuario y contraseña son los siguientes:</h2>

            <p>Usuario: {{$user_odontologo}}</p>
            <p>Contraseña: {{$pass_odontologo}}</p>
        </div>
        <!-- <div class="img2">
            <img src="https://ferrobell.com/assets/img/logo/logo.png">
        </div> -->
    </div>
    <div class="btn-ctn">
        <a href="https://radiologiadental.opticasintegra.com/resultados" class="btn-llamar">INGRESAR</a>
    </div>
</body>

</html>